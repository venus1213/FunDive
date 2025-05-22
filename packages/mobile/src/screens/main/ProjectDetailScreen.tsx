import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/ui/Button';
import { useRoute } from '@react-navigation/native';

const project = {
  id: '1',
  title: 'AIを活用した教育プラットフォーム',
  description: '最新のAI技術を活用して、個々の学習者に最適化された学習体験を提供します。',
  longDescription: `
    私たちは、教育のデジタル化が進む中で、より個別化された学習体験を提供することを目指しています。
    
    主な特徴：
    ・AIによる学習進度の最適化
    ・リアルタイムのフィードバック
    ・個別カリキュラムの自動生成
    ・学習データの可視化
    
    現在の開発状況：
    ・基本的なプラットフォームの構築完了
    ・AIモデルの学習データ収集中
    ・ベータテスターの募集開始
  `,
  category: 'AI/教育',
  stage: '開発中',
  members: [
    { id: '1', name: '山田太郎', role: 'プロジェクトリーダー' },
    { id: '2', name: '鈴木花子', role: 'AIエンジニア' },
    { id: '3', name: '佐藤次郎', role: 'UIデザイナー' },
  ],
  thumbnail: 'https://via.placeholder.com/300x200',
  requiredSkills: ['React Native', 'Python', 'AI/ML', 'UI/UXデザイン'],
};

export const ProjectDetailScreen = () => {
  const route = useRoute();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Image
          source={{ uri: project.thumbnail }}
          style={styles.projectImage}
        />
        
        <View style={styles.content}>
          {/* ヘッダー情報 */}
          <View style={styles.header}>
            <Text style={styles.title}>{project.title}</Text>
            <View style={styles.badges}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{project.category}</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{project.stage}</Text>
              </View>
            </View>
          </View>

          {/* 説明 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>プロジェクト概要</Text>
            <Text style={styles.description}>{project.longDescription}</Text>
          </View>

          {/* メンバー */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>メンバー</Text>
            {project.members.map((member) => (
              <View key={member.id} style={styles.memberItem}>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberRole}>{member.role}</Text>
              </View>
            ))}
          </View>

          {/* 必要なスキル */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>募集スキル</Text>
            <View style={styles.skillList}>
              {project.requiredSkills.map((skill, index) => (
                <View key={index} style={styles.skillItem}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* 参加ボタン */}
          <View style={styles.buttonContainer}>
            <Button
              title="プロジェクトに参加"
              onPress={() => {}}
              style={styles.button}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  scrollView: {
    flex: 1,
  },
  projectImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#e5e7eb',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 14,
    color: '#4b5563',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
  },
  memberItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  memberName: {
    fontSize: 16,
    color: '#111827',
  },
  memberRole: {
    fontSize: 14,
    color: '#6b7280',
  },
  skillList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillItem: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  skillText: {
    fontSize: 14,
    color: '#4b5563',
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    width: '100%',
  },
}); 