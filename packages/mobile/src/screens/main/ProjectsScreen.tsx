import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/ui/Button';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/MainStack';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const projects = [
  {
    id: '1',
    title: 'AIを活用した教育プラットフォーム',
    description: '最新のAI技術を活用して、個々の学習者に最適化された学習体験を提供します。',
    category: 'AI/教育',
    stage: '開発中',
    members: 3,
    thumbnail: 'https://via.placeholder.com/300x200',
  },
  {
    id: '2',
    title: 'サステナブルなモビリティサービス',
    description: '環境に優しい移動手段を提供する次世代のモビリティサービスを開発中です。',
    category: 'モビリティ',
    stage: 'アイデア段階',
    members: 2,
    thumbnail: 'https://via.placeholder.com/300x200',
  },
];

export const ProjectsScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* ヘッダー */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>プロジェクト</Text>
          <Button
            title="新規作成"
            onPress={() => navigation.navigate('CreateProject')}
            style={styles.createButton}
          />
        </View>

        {/* プロジェクトリスト */}
        <View style={styles.projectList}>
          {projects.map((project) => (
            <TouchableOpacity
              key={project.id}
              style={styles.projectCard}
              onPress={() => navigation.navigate('ProjectDetail', { id: project.id })}
            >
              <Image
                source={{ uri: project.thumbnail }}
                style={styles.projectImage}
              />
              <View style={styles.projectContent}>
                <View style={styles.projectHeader}>
                  <Text style={styles.projectTitle}>{project.title}</Text>
                  <View style={styles.projectBadge}>
                    <Text style={styles.projectStage}>{project.stage}</Text>
                  </View>
                </View>
                <Text style={styles.projectDescription}>{project.description}</Text>
                <View style={styles.projectFooter}>
                  <Text style={styles.projectCategory}>{project.category}</Text>
                  <View style={styles.projectMembers}>
                    <Text style={styles.projectMembersText}>
                      メンバー: {project.members}人
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  createButton: {
    paddingHorizontal: 16,
  },
  projectList: {
    padding: 16,
  },
  projectCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  projectImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#e5e7eb',
  },
  projectContent: {
    padding: 16,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  projectBadge: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  projectStage: {
    fontSize: 12,
    color: '#4b5563',
  },
  projectDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  projectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  projectCategory: {
    fontSize: 14,
    color: '#4b5563',
  },
  projectMembers: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  projectMembersText: {
    fontSize: 14,
    color: '#4b5563',
  },
}); 